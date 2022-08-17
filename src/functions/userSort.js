import User from '../../models/User';

const userSort = async (arr, user, sort) => {
  console.log(sort);
  if (user != undefined) {
    (
      await User.findAll({
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
