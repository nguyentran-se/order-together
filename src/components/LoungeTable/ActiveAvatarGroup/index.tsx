import { Avatar, AvatarGroup } from '@chakra-ui/react';
import styles from './index.module.scss';

function ActiveAvatarGroup() {
  return (
    <>
      <AvatarGroup size="sm" max={4} className={styles.ActiveAvatarGroup}>
        <Avatar name="PB" zIndex={0} />
        <Avatar name="NT" zIndex={1} />
        <Avatar name="HV" zIndex={2} />
        <Avatar name="NN" zIndex={3} />
        <Avatar name="YP" zIndex={4} />
      </AvatarGroup>
    </>
  );
}

export default ActiveAvatarGroup;
