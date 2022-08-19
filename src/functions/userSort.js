import User from '../../models/User';

const userSort = async (arr, user, sort) => {
  if (user != undefined) {
    const sortResult = await User.findAll({
      raw: true,
      where: {
        address: user.address,
      },
      order: [[`${sort}`, 'desc']],
      attributes: ['username', 'trash', 'plogging'],
    });
    sortResult.forEach((user) => {
      arr.push({ username: user.username, [sort]: user[sort] });
    });
  }
};

export default userSort;
