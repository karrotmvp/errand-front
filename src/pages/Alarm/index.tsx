import CustomScreenHelmet from "@components/CustomScreenHelmet";
import ToggleSwitch from "@components/ToggleSwitch";
import styled from "@emotion/styled";
import { SectionWrapper } from "@styles/shared";

export default function Alarm() {
  const getCallback = (fn: Function, params: any) => (result: boolean) => {
    fn(params, result);
  };
  const testAPI = (defaultParams: string, result: boolean) => {
    console.log(defaultParams, result);
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
            <AlarmRow>
              <p>벌레잡기</p>
              <ToggleSwitch
                callback={getCallback(testAPI, "test")}
                defaultValue={true}
              />
            </AlarmRow>
            <AlarmRow>
              <p>반려동물 산책하기</p>
              <ToggleSwitch callback={getCallback(testAPI, "test")} />
            </AlarmRow>
            <AlarmRow>
              <p>사다주세요</p>
              <ToggleSwitch
                callback={getCallback(testAPI, "test")}
                defaultValue={true}
              />
            </AlarmRow>
            <AlarmRow>
              <p>벌레잡기</p>
              <ToggleSwitch callback={getCallback(testAPI, "test")} />
            </AlarmRow>
          </div>
        </SectionWrapper>
        <SectionWrapper>
          <div className="section__title">
            <h3>지원자 알림</h3>
          </div>
          <div className="section__subscribe">
            심부름에 새로운 지원자가 들록될 때마다 알림을 받아요.
          </div>
          <div className="section__content">
            <AlarmRow>
              <p>새로운 지원자 알림받기</p>
              <ToggleSwitch callback={getCallback(testAPI, "test")} />
            </AlarmRow>
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

  & + & {
    margin-top: 2rem;
  }
`;
