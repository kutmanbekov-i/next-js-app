import styles from './sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h2>almǎ</h2>
      </div>
      <ul className={styles.sidebarMenu}>
        <li>Leads</li>
        <li>Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;