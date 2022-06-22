import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
  constructor(props) {
    
    super(props);
    // console.log("hello i am a constructor");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
    };
    console.log(this.props.apiKey)
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )}-NewsMonkey`;
  }
  async update() {
    this.props.setProgress(0);
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    this.props.setProgress(20);
    let parseData = await data.json();
    this.props.setProgress(50);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.update();
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  //  handleNextClick=async()=>{
  //      this.setState({page:this.state.page+1});
  //      this.update();

  //  }
  //  handlePrevClick=async()=>{
  //      this.setState({page:this.state.page-1});
  //      this.update();
  // }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    // this.setState({loading:true})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      loading: false,
    });
  };

  render() {
    return (
      <div>
        <div className="container my-3">
          <h2 className="text-center">
            NewsMonkey-{this.capitalizeFirstLetter(this.props.category)} Top
            Headlines
          </h2>
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner />}
          >
            <div className="row my-4 ">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      author={element.author}
                      publishedAt={element.publishedAt}
                      source={element.source.name}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                    />
                  </div>
                );
              })}
            </div>
          </InfiniteScroll>
        </div>

        {/* used earlier for next and preview but after infinite scroll was used. */}
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-sm btn-warning" onClick={this.handlePrevClick}>&larr;Preview</button>
        <button disabled={this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-sm btn-warning "onClick={this.handleNextClick}>Next&rarr;</button>
        </div> */}
      </div>
    );
  }
}

export default News;
