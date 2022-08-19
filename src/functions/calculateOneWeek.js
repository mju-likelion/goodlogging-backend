import Plogging from '../../models/Plogging';
import { Op } from 'sequelize';

const calculateOneWeekCheck = async (user, month, day) => {
  if (user != undefined && parseInt(day) >= 7) {
    let check = true;

    for (let i = day - 6; i <= day; i++) {
      let plogging = await Plogging.findOne({
        where: {
          owner: user.id,
          createdAt: {
            [Op.like]: `%${month}-${day}%`,
          },
        },
      });
      if (!plogging) {
        check = false;
        break;
      }
    }

    return check;
  }
};

export default calculateOneWeekCheck;
