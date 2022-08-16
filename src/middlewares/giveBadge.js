import Badge from '../../models/Badge';
import { sequelize } from '../../models';

const giveBadge = async (badgeName, req) => {
  const { user } = req;

  const badgeStorage = sequelize.models.badgeStorage;
  const badge = await Badge.findOne({
    where: {
      title: badgeName,
    },
  });

  // badgeStorage는 owner와 badge로 이루어져 있다.
  const isUserHaveBadge = await badgeStorage.findOne({
    where: {
      owner: user.id,
      badge: badge.id,
    },
  });

  // 유저-뱃지가 연결되지 않았을 때만 진행
  if (!isUserHaveBadge) {
    await badgeStorage.create({
      owner: user.id,
      badge: badge.id,
    });
  }
};

export default giveBadge;
