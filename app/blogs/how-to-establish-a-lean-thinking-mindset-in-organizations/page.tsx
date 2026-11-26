import { getAdditionalArticle, StandardArticle } from "../_components/standard-article";
import { pageMeta } from "@/lib/seo";
const article=getAdditionalArticle("how-to-establish-a-lean-thinking-mindset-in-organizations");
export const metadata=pageMeta({title:`${article.title} | Rajesh Koul`,description:article.subtitle,path:"/blogs/how-to-establish-a-lean-thinking-mindset-in-organizations",image:article.image,type:"article"});
export default function Page(){return <StandardArticle article={article}/>}
