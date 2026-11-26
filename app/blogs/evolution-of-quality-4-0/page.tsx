import { getAdditionalArticle, StandardArticle } from "../_components/standard-article";
import { pageMeta } from "@/lib/seo";
const article=getAdditionalArticle("evolution-of-quality-4-0");
export const metadata=pageMeta({title:`${article.title} | Rajesh Koul`,description:article.subtitle,path:"/blogs/evolution-of-quality-4-0",image:article.image,type:"article"});
export default function Page(){return <StandardArticle article={article}/>}
