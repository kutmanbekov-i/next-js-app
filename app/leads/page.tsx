'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const LeadsPage = () => {
  const [leads, setLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!localStorage.getItem('isAuthenticated')) {
      router.push('/signin')
    } else {
      // mock
      setLeads([
        { id: 1, name: 'John Doe', status: 'PENDING' },
        { id: 2, name: 'Jane Smith', status: 'REACHED_OUT' },
      ])
      setLoading(false)
    }
  }, [])

  const updateLeadStatus = (id: number) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === id ? { ...lead, status: 'REACHED_OUT' } : lead
      )
    )
  }

  return (
    <div className="table-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.name}</td>
                <td>{lead.status}</td>
                <td>
                  {lead.status === 'PENDING' && (
                    <button onClick={() => updateLeadStatus(lead.id)}>
                      Mark as Reached Out
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default LeadsPage
