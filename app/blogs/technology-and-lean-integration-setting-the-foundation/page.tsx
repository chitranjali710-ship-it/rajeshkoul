import { getAdditionalArticle, StandardArticle } from "../_components/standard-article";
import { pageMeta } from "@/lib/seo";

const article=getAdditionalArticle("technology-and-lean-integration-setting-the-foundation");

export const metadata=pageMeta({title:`${article.title} | Rajesh Koul`,description:article.subtitle,path:"/blogs/technology-and-lean-integration-setting-the-foundation",image:article.image,type:"article"});

export default function Page(){return <StandardArticle article={article}/>}
