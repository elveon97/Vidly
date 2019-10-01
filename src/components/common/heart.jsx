import React from "react";

class Heart extends React.Component {
  getStyles() {
    return "fa fa-heart" + (this.props.movie.liked ? "" : "-o");
  }

  toggle = () => {
    const like = !this.state.like;
    this.setState({
      like
    });
  };

  render() {
    const styles = this.getStyles();
    return (
      <i
        className={styles}
        onClick={() => this.props.onClick(this.props.movie)}
      ></i>
    );
  }
}

export default Heart;
