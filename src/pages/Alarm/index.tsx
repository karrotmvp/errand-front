import {
  usePatchCategoryAlarm,
  usePatchNewApplierAlarm,
  useUserAlarms,
} from "@api/user";
import CustomScreenHelmet from "@components/CustomScreenHelmet";
import ToggleSwitch from "@components/ToggleSwitch";
import styled from "@emotion/styled";
import { SectionWrapper } from "@styles/shared";

export default function Alarm() {
  const { status, data } = useUserAlarms();

  const mutationCategoryAlarm = usePatchCategoryAlarm();
  const mutationNewApplierAlarm = usePatchNewApplierAlarm();

  const toggleCurry =
    (callback: Function, ...rest: unknown[]) =>
    (on: boolean) => {
      callback(on, ...rest);
    };

  const toggleCategoryAlarm = (on: boolean, categoryId: number) => {
    mutationCategoryAlarm.mutate({ categoryId, on });
  };

  const toggleNewApplierAlarm = (on: boolean) => {
    mutationNewApplierAlarm.mutate({ on });
  };

  return (
    <>
      <CustomScreenHelmet title="알람설정" />
      <AlarmWrapper>
        <SectionWrapper>
          <div className="section__title">
            <h3>카테고리 알림</h3>
          </div>
          <div className="section__subscribe">
            카테고리의 새로운 심부름이 등록될 때 알림을 받아요.
          </div>
          <div className="section__content">
            {status !== "loading" &&
              data &&
              data.categoryStatusList.map((row) => (
                <AlarmRow key={row.categoryId}>
                  <p>{row.name}</p>
                  <ToggleSwitch
                    callback={toggleCurry(toggleCategoryAlarm, row.categoryId)}
                    defaultValue={row.status}
                  />
                </AlarmRow>
              ))}
          </div>
        </SectionWrapper>
        <Divider />
        <SectionWrapper>
          <div className="section__title">
            <h3>지원자 알림</h3>
          </div>
          <div className="section__subscribe">
            심부름에 새로운 지원자가 등록될 때마다 알림을 받아요.
          </div>
          <div className="section__content">
            {status !== "loading" && data && (
              <AlarmRow>
                <p>새로운 지원자 알림받기</p>
                <ToggleSwitch
                  callback={toggleCurry(toggleNewApplierAlarm)}
                  defaultValue={data.newHelpAlarm}
                />
              </AlarmRow>
            )}
          </div>
        </SectionWrapper>
      </AlarmWrapper>
    </>
  );
}

const AlarmWrapper = styled.div`
  padding: 3rem 0;
  ${({ theme }) => theme.container};
`;

const AlarmRow = styled.div`
  ${({ theme }) => theme.font("large", "regular")}
  display: flex;
  justify-content: space-between;

  &:not(:first-child) {
    margin-top: 2rem;
  }
`;

const Divider = styled.div`
  border-top: 0.1rem solid ${({ theme }) => theme.color.grey7};

  margin: 3rem 0;
`;
