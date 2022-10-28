import CardList from 'components/CardList';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { loungeApi } from 'services/firebase/apis';

const LoungeRoom = () => {
  const router = useRouter();
  const { loungeId } = router.query;
  const [loungeById, setLoungeById] = useState(null);

  useEffect(() => {
    if (loungeId) {
      loungeApi.getLoungeById(loungeId as string).then((res: any) => {
        if (res?.activeMerchantID) {
          setLoungeById({
            ...res.entities[res.activeMerchantID].menu,
            roomId: res.entities[res.activeMerchantID].ID,
          });
        }
      });
    }
  }, [loungeId]);

  return <>{!!loungeById && <CardList data={loungeById}></CardList>}</>;
};

export default LoungeRoom;
