import CardList from 'components/CardList';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loungeApi } from 'services/firebase/apis';

const LoungeRoom = () => {
  const router = useRouter();
  const { loungeId } = router.query;
  const [loungeById, setLoungeById] = useState(null);
  // const lounge = useAppSelector(selectLounge);
  // const loungeById = lounge.find((l) => l.activeMerchantID == loungeId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loungeId) {
      loungeApi.getLoungeById(loungeId as string).then((res: any) => {
        setLoungeById(res.entities[loungeId as string].menu);
      });
    }
  }, [loungeId]);

  return <>{!!loungeById && <CardList data={loungeById}></CardList>}</>;
};

export default LoungeRoom;
