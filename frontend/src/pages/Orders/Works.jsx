import { useState } from 'react';
import WorksTabs from "../../components/orders/WorksTabs";

export default function Works() {
  const [activeTab, setActiveTab] = useState('my-jobs');

  return (
    <section className="bg-background">
      <WorksTabs activeTab={activeTab} onTabChange={setActiveTab} />
    </section>
  );
}
