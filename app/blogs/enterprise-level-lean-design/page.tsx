import { getAdditionalArticle, StandardArticle } from "../_components/standard-article";
import { pageMeta } from "@/lib/seo";
const article=getAdditionalArticle("enterprise-level-lean-design");
export const metadata=pageMeta({title:`${article.title} | Rajesh Koul`,description:article.subtitle,path:"/blogs/enterprise-level-lean-design",image:article.image,type:"article"});
export default function Page(){return <StandardArticle article={article}/>}
