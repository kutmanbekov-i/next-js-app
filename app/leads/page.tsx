"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Sidebar from '../components/sidebar/sidebar';

const LeadsPage = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('isAuthenticated')) {
      router.push('/sign-in');
    } else {
      // Mock data
      setLeads([
        { id: 1, name: 'Jorge Ruiz', submitted: '02/02/2024, 2:45 PM', status: 'Pending', country: 'Mexico' },
        { id: 2, name: 'Bahar Zamir', submitted: '02/02/2024, 2:45 PM', status: 'Pending', country: 'Mexico' },
        { id: 3, name: 'Mary Lopez', submitted: '02/02/2024, 2:45 PM', status: 'Pending', country: 'Brazil' },
        { id: 4, name: 'Li Zijin', submitted: '02/02/2024, 2:45 PM', status: 'Pending', country: 'South Korea' },
        { id: 5, name: 'Mark Antonov', submitted: '02/02/2024, 2:45 PM', status: 'Pending', country: 'Russia' },
        { id: 6, name: 'Jane Ma', submitted: '02/02/2024, 2:45 PM', status: 'Pending', country: 'Mexico' },
        { id: 7, name: 'Anand Jain', submitted: '02/02/2024, 2:45 PM', status: 'Reached Out', country: 'Mexico' },
        { id: 8, name: 'Anna Voronova', submitted: '02/02/2024, 2:45 PM', status: 'Pending', country: 'France' },
      ]);
      setLoading(false);
    }
  }, [router]);

  const updateLeadStatus = (id: number) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === id ? { ...lead, status: 'Reached Out' } : lead
      )
    );
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesName = lead.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesStatus = searchStatus ? lead.status === searchStatus : true;
    return matchesName && matchesStatus;
  });

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContent}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className={styles.searchInput}
          />
          <select
            value={searchStatus}
            onChange={(e) => setSearchStatus(e.target.value)}
            className={styles.statusSelect}
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Reached Out">Reached Out</option>
          </select>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Submitted</th>
                <th>Status (click to change)</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>{lead.submitted}</td>
                  <td>
                    <button
                      className={styles.statusButton}
                      onClick={() => updateLeadStatus(lead.id)}
                    >
                      {lead.status}
                    </button>
                  </td>
                  <td>{lead.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LeadsPage;