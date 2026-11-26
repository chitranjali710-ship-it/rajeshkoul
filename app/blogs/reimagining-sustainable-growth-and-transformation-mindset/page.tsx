import { getAdditionalArticle, StandardArticle } from "../_components/standard-article";
import { pageMeta } from "@/lib/seo";

const article=getAdditionalArticle("reimagining-sustainable-growth-and-transformation-mindset");

export const metadata=pageMeta({title:`${article.title} | Rajesh Koul`,description:article.subtitle,path:"/blogs/reimagining-sustainable-growth-and-transformation-mindset",image:article.image,type:"article"});

export default function Page(){return <StandardArticle article={article}/>}
