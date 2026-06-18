import { useState } from 'react';
import AccountTabs from '../../components/account/AccountTabs';
import SecurityTab from '../../components/account/SecurityTab';
import PersonalDataTab from '../../components/account/PersonalDataTab';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function Account() {
  const {
    user: { data },
  } = useAuthContext();
  const { full_name, email, phone } = data;
  const [activeTab, setActiveTab] = useState('personal');
  return (
    <section className={`bg-background `}>
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
