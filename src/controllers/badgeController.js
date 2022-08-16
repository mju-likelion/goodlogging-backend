import Badge from '../../models/Badge';
import { sequelize } from '../../models';
import asyncWrapper from '../errors/wrapper';

export const badgeHome = async (req, res) => {
  // id, isCorrect, name..
  const { user } = req;
  const badges = [];
  const badgeStorage = sequelize.models.badgeStorage;

  for await (const badge of await Badge.findAll({})) {
    // 모든 "뱃지"에 대해서 for 진행

    // 각각의 뱃지에 대한 badge - owner 연결 관계 조회
    const store = await badgeStorage.findOne({
      raw: true,
      where: { badge: badge.id, owner: user.id },
    });

    badges.push({
      id: badge.id,
      isCorrect: store ? true : false,
      name: badge.title,
      description: badge.description,
      condition: badge.condition,
    });
  }

  return res.json(badges);
};

export default {
  badgeHome: asyncWrapper(badgeHome),
};
