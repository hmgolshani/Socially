import UserCard, { type RecommendedUser } from "@/components/cards/recommendedCard/UserCard.tsx";
import farshadImage from "@/assets/images/farshad.png";

const recommendedUsers: RecommendedUser[] = [
  { username: "mohammadfallah.w", followers: 1 },
  { username: "sara.ahmadi", followers: 1 },
  {
    username: "f.e.h.farshad",
    name: "Farshad Hosseini",
    followers: 1,
    image: farshadImage,
  },
];

const RecommendedUserCard = () => {
  return (
    <div className="rounded-xl border border-layout-border bg-layout-card p-6">
      <h3 className="pb-3 font-semibold text-content-primary">Who to Follow</h3>
      <div className="flex flex-col gap-2.5">
        {recommendedUsers.map((user) => (
          <UserCard key={user.username} user={user} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedUserCard;