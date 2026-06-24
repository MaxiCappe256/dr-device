import { useState } from 'react';
import AccountTabs from '../../components/ui/account/AccountTabs';
import SecurityTab from '../../components/ui/account/SecurityTab';
import PersonalDataTab from '../../components/ui/account/PersonalDataTab';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function Account() {
  const {
    user: { data },
  } = useAuthContext();
  const { full_name, email, phone } = data;
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <section className="bg-background">
      <AccountTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-6 w-full rounded-2xl border border-surface-container-highest bg-surface-container-lowest p-5 shadow-sm sm:mt-10 sm:p-8 lg:p-10">
        {activeTab === 'personal' ? (
          <PersonalDataTab fullName={full_name} email={email} phone={phone} />
        ) : (
          <SecurityTab />
        )}
      </div>
    </section>
  );
}
