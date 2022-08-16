import Challenge from '../../models/Challenge';
import { sequelize } from '../../models';
import asyncWrapper from '../errors/wrapper';
import Badge from '../../models/Badge';
import { Op } from 'sequelize';

const hashtagRoom = async (req, res) => {
  const { user } = req;
  const badgeStorage = sequelize.models.badgeStorage;
  const badges = [];
  const containId = [];
  let badgeCount = 0;

  const challenge = await Challenge.findOne({
    where: {
      owner: user.id,
    },
    attributes: ['goal', 'done'],
  });

  // 뱃지 가져오는 방법
  // 1. 일단 유저가 가지고 있는 뱃지를 가져온다 (정렬 순서: 뱃지를 획득한 순서 (오래된 순))
  let userOwnBadges = await badgeStorage.findAll({
    raw: true,
    where: {
      owner: user.id,
    },
    order: [['createdAt', 'asc']],
  });

  // 2. 가지고 있는 뱃지의 갯수가 6개를 초과하는지 검사하고 초과하면 자른다
  if (userOwnBadges.length <= 6) {
    badgeCount = userOwnBadges.length;
  } else {
    userOwnBadges = userOwnBadges.slice(0, 6);
  }

  // 3. 가지고 있는 뱃지에 대한 정보들을 넣는다
  for await (const target of userOwnBadges) {
    badges.push(
      await Badge.findOne({
        raw: true,
        where: {
          id: target.badge,
        },
        attributes: ['id', 'title', 'description', 'condition'],
      })
    );
    containId.push(target.badge);
  }

  // 4. 나머지 갯수가 있을 경우 유저가 가지지 않은 뱃지를 id 기준으로 정렬 (기본 정렬)한 뒤 그 갯수만큼을 배열에 추가한다
  let remains = await Badge.findAll({
    raw: true,
    where: {
      id: {
        [Op.notIn]: containId,
      },
    },
    attributes: ['id', 'title', 'description', 'condition'],
  });

  remains = remains.splice(0, 6 - badgeCount);

  // 유저가 가지고 있지 않은 뱃지들도 결과애 추가 (총 뱃지 갯수는 6개가 됨)
  remains.forEach((remain) => {
    badges.push(remain);
  });

  return res.json({
    challenge,
    badges,
  });
};

export default {
  hashtagRoom: asyncWrapper(hashtagRoom),
};
