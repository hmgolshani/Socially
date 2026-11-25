import UserCard from "@/components/cards/recommendedCard/UserCard.tsx";

const RecommendedUserCard = () => {
  return (
    <div className="rounded-xl border border-layout-border bg-layout-card p-6">
      <h3 className="text-content-primary font-bold pb-3">Who to Follow</h3>
      <div className="flex flex-col gap-2.5 ">
        <UserCard username={"mobina@wwd"} fullName={"Mobina Golshani"} followersCount={4}/>
        <UserCard username={"mobina@wwd"} fullName={"Mobina Golshani"} followersCount={4}/>
        <UserCard username={"mobina@wwd"} fullName={"Mobina Golshani"} followersCount={4}/>
      </div>
    </div>
  );
};

export default RecommendedUserCard;