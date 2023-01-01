import TabButton from "components/TabButton";
import { STATUS } from "constant";

export default function ListFilter(props: {
  filterStatus: string,
  setFilterStatus: (filterStatus: string) => void,
}) {
  const { filterStatus, setFilterStatus } = props;

  function handleFilterClick(filterStatus: string) {
    return () => {
      setFilterStatus(filterStatus);
    };
  }

  return (
    <div className="flex flex-col mt-5">
      <div className="flex flex-row flex-1">
        <TabButton
          className="w-full"
          onClick={handleFilterClick(STATUS.all)}
          active={filterStatus === STATUS.all}
        >
          顯示全部
        </TabButton>
        <TabButton
          className="w-full"
          onClick={handleFilterClick(STATUS.active)}
          active={filterStatus === STATUS.active}
        >
          顯示未完成
        </TabButton>
        <TabButton
          className="w-full"
          onClick={handleFilterClick(STATUS.completed)}
          active={filterStatus === STATUS.completed}
        >
          顯示已完成
        </TabButton>
      </div>
    </div>
  );
}
