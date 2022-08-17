import Badge from '../../models/Badge';
import { sequelize } from '../../models';
import asyncWrapper from '../errors/wrapper';
import { Op } from 'sequelize';

export const badgeHome = async (req, res) => {
  const { user } = req;
  const badgeStorage = sequelize.models.badgeStorage;
  const badges = [];
  const containId = [];

  // 1. 유저가 획득한 뱃지들을 불러온다
  let userOwnBadges = await badgeStorage.findAll({
    raw: true,
    where: {
      owner: user.id,
    },
    order: [['createdAt', 'asc']],
  });

  // 2. 가지고 있는 뱃지에 대한 정보들을 넣는다.
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

  // 3. 유저가 가지지 않은 뱃지들을 추가로 넣어준다.
  const remains = await Badge.findAll({
    raw: true,
    where: {
      id: {
        [Op.notIn]: containId,
      },
    },
    attributes: ['id', 'title', 'description', 'condition'],
  });

  remains.forEach((remain) => {
    badges.push(remain);
  });

  return res.json(badges);
};

export default {
  badgeHome: asyncWrapper(badgeHome),
};
