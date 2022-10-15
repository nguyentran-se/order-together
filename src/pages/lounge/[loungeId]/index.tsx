import { useRouter } from 'next/router';

const LoungeRoom = () => {
  const router = useRouter();
  const { loungeId } = router.query;

  return <p>LoungeRoom: {loungeId}</p>;
};

export default LoungeRoom;
