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
          <span>{mannerPoint} °C</span>
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
      width: 4.7rem;
      height: 4.7rem;
      background: black;
      border-radius: 3rem;
      overflow: hidden;
    }

    &__info {
      margin-left: 1.2rem;
      flex: 1;
      h2 {
        ${({ theme }) => theme.font("large", "regular")}
      }
      &-sub {
        ${({ theme }) => theme.font("small", "medium")}
        color: ${({ theme }) => theme.color.grey4};

        & > span + span::before {
          content: " • ";
          margin: 0 0.5rem;
        }
      }
    }
  }
`;
