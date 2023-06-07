import Head from "next/head";
import Layout from '../../components/Layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';
import Date from '../../components/Date';
import { MDXRemote } from "next-mdx-remote";
import CodeBlock from '../../components/CodeBlock'

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
    // Add the "await" keyword like this:
    const postData = await getPostData(params.id);
  
    return {
      props: {
        postData,
      },
    };
  }

// const Button = ({ children }) => {
//   const handleClick = (target)=> alert(`thanks to ${target}`)
//   return (
//     <button onClick={handleClick}>{children}</button>
//   )
// }

const Button = ({ children }) => {
  return <button onClick={()=> alert(`thanks to ${children}`)}>{children}</button>
}

const components = { Button, CodeBlock }

export default function Post({ postData }) {
    return (
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          {postData.contentHtml && <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />}
          {postData.mdxSource && <MDXRemote {...postData.mdxSource} components={components} />}
        </article>
      </Layout>
    );
}