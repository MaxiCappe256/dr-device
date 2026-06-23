import { ToolKitIcon, NavigateOutlineIcon, OfferIcon } from "../../../utils/icons";
import MyJobs from "./MyJobs";
import FindJobs from "./FindJobs";
import OffersList from "../offers/OffersList.jsx";

const tabs = [
  {
    id: 'my-jobs',
    label: 'Mis trabajos',
    icon: ToolKitIcon,
    Component: MyJobs
  },
  {
    id: 'offers',
    label: "Mis ofertas",
    icon: OfferIcon,
    Component: OffersList
  },
  {
    id: 'find-jobs',
    label: 'Encontrar trabajo',
    icon: NavigateOutlineIcon,
    Component: FindJobs
  }
];


export default function WorksTabs({ activeTab, onTabChange }) {
  const { Component } = tabs.find(({ id }) => id === activeTab)
  return (
    <>
      <div className="mt-12 border-b border-surface-container-highest">
        <div className="flex gap-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                type="button"
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-3 border-b-3 px-10 py-4 text-xl font-medium transition-colors cursor-pointer ${isActive
                  ? 'border-primary text-primary'
                  : 'border-transparent text-on-surface-variant hover:text-primary'
                  }`}
              >
                <Icon className="size-5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col mt-10 w-full rounded-xl border-surface-container-highest gap-4">
        <Component />
      </div>
    </>
  );
}
