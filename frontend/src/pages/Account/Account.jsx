import { useState } from 'react';
import AccountTabs from '../../components/account/AccountTabs';
import SecurityTab from '../../components/account/SecurityTab';
import PersonalDataTab from '../../components/account/PersonalDataTab';
import { useAuthContext } from '../../hooks/useAuthContext';

const SaveIcon = ({ className = 'size-5' }) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.25 5.25h11.25l2.25 2.25v11.25H5.25V5.25Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 5.25v5.25h7.5V5.25"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 18.75v-4.5h7.5v4.5"
    />
  </svg>
);

export default function Account() {
  const {
    user: { data },
  } = useAuthContext();
  console.log(data);
  const { full_name, email, phone, createdAt, roles } = data;
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <section className="min-h-screen bg-background">
      <AccountTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-10 max-w-5xl rounded-2xl border border-surface-container-highest bg-surface-container-lowest p-10 shadow-sm">
        {activeTab === 'personal' ? (
          <PersonalDataTab fullName={full_name} email={email} phone={phone} />
        ) : (
          <SecurityTab />
        )}
      </div>
    </section>
  );
}
