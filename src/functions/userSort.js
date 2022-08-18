import User from '../../models/User';

const userSort = async (arr, user, sort) => {
  if (user != undefined) {
    (
      await User.findAll({
        raw: true,
        where: {
          address: user.address,
        },
        order: [[`${sort}`, 'desc']],
        attributes: ['username'],
      })
    ).forEach((user) => arr.push(user));
  }
};

export default userSort;
