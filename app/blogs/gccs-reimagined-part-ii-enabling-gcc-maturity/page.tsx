import { getAdditionalArticle, StandardArticle } from "../_components/standard-article";
import { pageMeta } from "@/lib/seo";

const article=getAdditionalArticle("gccs-reimagined-part-ii-enabling-gcc-maturity");

export const metadata=pageMeta({title:`${article.title} | Rajesh Koul`,description:article.subtitle,path:"/blogs/gccs-reimagined-part-ii-enabling-gcc-maturity",image:article.image,type:"article"});

export default function Page(){return <StandardArticle article={article}/>}
