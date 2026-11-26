import { getAdditionalArticle, StandardArticle } from "../_components/standard-article";
import { pageMeta } from "@/lib/seo";
const article=getAdditionalArticle("lean-thinking-customer-value-people-first-a-better-tomorrow");
export const metadata=pageMeta({title:`${article.title} | Rajesh Koul`,description:article.subtitle,path:"/blogs/lean-thinking-customer-value-people-first-a-better-tomorrow",image:article.image,type:"article"});
export default function Page(){return <StandardArticle article={article}/>}
