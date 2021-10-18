import { DEFAULT_THUMBNAIL } from "@constant/default";
import styled from "@emotion/styled";
import { User } from "@type/response";

type ProfileProps = User;

export default function Profile({
  nickname,
  regionName,
  mannerPoint,
  profileImgUrl = DEFAULT_THUMBNAIL,
}: ProfileProps) {
  return (
    <ProfileWrapper>
      <div className="my-profile__image">
        <img src={profileImgUrl} alt="thumbnail" />
      </div>
      <div className="my-profile__info">
        <h2>{nickname}</h2>
        <div className="my-profile__info-sub">
          <span>{regionName}</span>
          <span>{mannerPoint}</span>
        </div>
      </div>
    </ProfileWrapper>
  );
}

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  .my-profile {
    &__image {
      width: 6rem;
      height: 6rem;
      background: black;
      border-radius: 3rem;
    }

    &__info {
      margin-left: 1.2rem;
      flex: 1;
      h2 {
        ${({ theme }) => theme.font("large", "bold")}
      }
      &-sub {
        ${({ theme }) => theme.font("small")}
      }
    }
  }
`;
