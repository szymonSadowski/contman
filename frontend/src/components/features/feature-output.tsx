import { KittensFeature } from "./kittens-feature";
import { RandomNumberFeature } from "./random-number-feature";
import { CompanyFeature } from "./company-feature";

type Props = {
  feature: string;
  userId: string;
};

export function FeatureOutput({ feature, userId }: Props) {
  switch (feature) {
    case "kittens":
      return <KittensFeature />;
    case "random-number":
      return <RandomNumberFeature />;
    case "company":
      return <CompanyFeature userId={userId} />;
    default:
      return (
        <span className="font-mono text-xs text-muted-foreground">
          unknown feature
        </span>
      );
  }
}
