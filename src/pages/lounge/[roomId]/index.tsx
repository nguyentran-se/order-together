import { useRouter } from 'next/router';

const LoungeRoom = () => {
  const router = useRouter();
  const { roomId } = router.query;

  return <p>LoungeRoom: {roomId}</p>;
};

export default LoungeRoom;
