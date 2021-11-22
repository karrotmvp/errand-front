import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import { SectionWrapper, StickyFooter, StickyPageWrpper } from "@styles/shared";
import CustomScreenHelmet from "@components/CustomScreenHelmet";
import { Title } from "@pages/Home";
import Button from "@components/Button";
import NodataImage from "@assets/images/no-data.png";
import { CATEGORYS } from "@constant/category";
import { Category } from "@type/response";
import { Check } from "@assets/icon";
import { useNavigator } from "@karrotframe/navigator";

export default function Feed() {
  const { push } = useNavigator();

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  const handleClickCategory = useCallback(
    (id: number) => {
      setSelectedCategoryId(id);
    },
    [setSelectedCategoryId]
  );

  const handleClickButton = () => {
    push(`/errand-request?categoryId=${selectedCategoryId}`);
  };

  return (
    <StickyPageWrpper>
      <CustomScreenHelmet
        title={
          <Title>
            <h1>당근심부름</h1>
            <span>Beta</span>
          </Title>
        }
      />
      <FeedWrapper>
        <SectionWrapper>
          <div className="section__title">
            <h3>당근 심부름을 이용해 보세요.</h3>
          </div>
          <div className="section__content">
            <Banner>
              <p>
                당근심부름은 동네 이웃에게 필요한 심부름을 부탁하는 서비스에요.
              </p>
              <div>
                <img src={NodataImage} alt="nodata" />
              </div>
            </Banner>
          </div>
        </SectionWrapper>
        <SectionWrapper>
          <div className="section__title">
            <h3>심부름 카테고리를 선택해주세요.</h3>
          </div>
          <div className="section__content">
            {CATEGORYS.map((category) => (
              <CategoryItem
                {...category}
                handleClickCategory={handleClickCategory}
                isSelected={selectedCategoryId === category.id}
                key={category.id}
              />
            ))}
          </div>
        </SectionWrapper>
      </FeedWrapper>
      <StickyFooter>
        <Button
          buttonType="contained"
          size="small"
          color="primary"
          fullWidth
          rounded
          disabled={!Boolean(selectedCategoryId)}
          onClick={handleClickButton}
        >
          심부름 상세 작성하기
        </Button>
      </StickyFooter>
    </StickyPageWrpper>
  );
}

const FeedWrapper = styled.div`
  padding-top: 2rem;
  ${({ theme }) => theme.container}
  height: 100%;
`;

const Banner = styled.div`
  background: #fff0e8;
  border: 0.1rem solid #f1d6c7;
  border-radius: 0.8rem;

  display: flex;
  height: 11.8rem;

  & > p {
    padding: 2rem 1.8rem;
  }

  & > div {
    display: flex;
    align-items: flex-end;
  }
`;

const CategoryItem = ({
  id,
  name,
  subscribe,
  imageUrl,
  isSelected,
  handleClickCategory,
}: Category & {
  isSelected: boolean;
  handleClickCategory: (id: number) => void;
}) => {
  return (
    <CategoryItemWrapper
      isSelected={isSelected}
      onClick={() => {
        handleClickCategory(id);
      }}
    >
      <div className="category-item__check">
        <Check />
      </div>
      <div className="category-item__text">
        <h4>{name}</h4>
        {subscribe && <p>{subscribe}</p>}
      </div>
      <div>
        <img src={imageUrl} alt={name} />
      </div>
    </CategoryItemWrapper>
  );
};

const CategoryItemWrapper = styled.div<{ isSelected: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;

  .category-item__check {
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 2.3rem 1.7rem;
    & > svg {
      width: 3rem;
      height: 3rem;
      fill: ${({ theme, isSelected }) =>
        isSelected ? theme.color.primary : theme.color.grey8};
      stroke: ${({ theme, isSelected }) =>
        isSelected ? "white" : theme.color.grey6};
      stroke-width: 0.05rem;
    }
  }

  .category-item__text {
    flex: 1;
  }

  &:not(:first-child) {
    border-top: 0.1rem solid ${({ theme }) => theme.color.grey7};
  }
`;
