import PropTypes from 'prop-types'
import Image from 'gatsby-image'
import readingTime from 'reading-time'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import PageHeader from '../components/PageHeader'
import SEO from '../components/SEO'
import { options } from './helpers'
import { useScript } from '../hooks'

const BlogPost = ({ pageContext }) => {
  const { contentfulData } = pageContext
  const { data } = contentfulData
  const src = 'https://assets.codepen.io/assets/embed/ei.js'
  useScript(src)

  const contentfulBlogContent = documentToReactComponents(
    data.contentfulBlogPost.body.json,
    options
  )

  let text = ''
  contentfulBlogContent.forEach(reactElement => (text += reactElement.props.children))
  const readingStats = readingTime(text)

  return (
    <>
      <SEO
        title={data.contentfulBlogPost.title}
        image={data.contentfulBlogPost.featureImage.file.url}
      />
      <PageHeader title={data.contentfulBlogPost.title} link={'blog'} />
      <section id="blog-page" className="section bg-default">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <article className="post">
                <div className="entry-content">
                  <Image
                    className="align-left"
                    alt={data.contentfulBlogPost.author.authorName}
                    fixed={data.contentfulBlogPost.author.authorImage.fixed}
                    style={{ width: 50, height: 50, borderRadius: 100 }}
                  />
                  <div className="entry-meta">
                    <h2 className="entry-title">{data.contentfulBlogPost.title}</h2>
                    <div className="entry-meta-data" style={{ marginBottom: 0 }}>
                      <span className="author">
                        <p>
                          by{' '}
                          <span className="blog-author" style={{ outline: 'none' }}>
                            {data.contentfulBlogPost.author.authorName}
                          </span>{' '}
                          <span>&middot;</span> {readingStats.text} <span>&middot;</span>{' '}
                          {data.contentfulBlogPost.publishedDate}
                        </p>
                      </span>
                    </div>
                  </div>
                  {contentfulBlogContent}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

BlogPost.propTypes = {
  pageContext: PropTypes.shape({
    contentfulData: PropTypes.shape({
      data: PropTypes.shape({
        contentfulBlogPost: PropTypes.shape({
          id: PropTypes.string,
          slug: PropTypes.string,
          publishedDate: PropTypes.string,
          title: PropTypes.string,
          featureImage: PropTypes.shape({
            file: PropTypes.shape({
              url: PropTypes.string,
            }),
          }),
          author: PropTypes.shape({
            authorName: PropTypes.string,
            authorImage: PropTypes.shape({
              fixed: PropTypes.shape({
                width: PropTypes.number,
                height: PropTypes.number,
                src: PropTypes.string,
                srcSet: PropTypes.string,
              }),
            }),
          }),
          body: PropTypes.shape({
            json: PropTypes.shape({
              data: PropTypes.object,
              content: PropTypes.arrayOf(
                PropTypes.shape({
                  data: PropTypes.object,
                  content: PropTypes.arrayOf(
                    PropTypes.shape({
                      data: PropTypes.object,
                      marks: PropTypes.array,
                      value: PropTypes.string,
                      nodeType: PropTypes.string,
                    })
                  ),
                })
              ),
            }),
          }),
        }),
      }),
    }),
  }),
  children: PropTypes.oneOf([PropTypes.string, PropTypes.array]),
}

export default BlogPost
