// 챌린지 계산

import Challenge from '../../models/Challenge';

// 가입된 시점에서 챌린지 기본 생성되도록 --> 완료
// 다른 달 챌린지 조회 시 에러 표현되도록 --> 완료

// 7월에서 8월로 넘어가는 시점에서는 --> 챌린지의 정보가 초기화되어야 함

const convertChallenge = async (req, res, next) => {
  const { user } = req;
  const date = JSON.stringify(new Date());
  const year = date.substring(1, 5);
  const month = date.substring(6, 8);
  const predictStr = `${year}-${month}`;

  const challenge = await Challenge.findOne({
    where: {
      owner: user.id,
    },
  });

  const actualStr = JSON.stringify(challenge.createdAt).substring(1, 8);

  if (!(predictStr === actualStr)) {
    const goal = challenge.goal;
    const owner = challenge.owner;

    await Challenge.destroy({
      where: {
        id: challenge.id,
      },
    });

    await Challenge.create({
      goal,
      owner,
    });
  }

  next();
};

export default convertChallenge;
