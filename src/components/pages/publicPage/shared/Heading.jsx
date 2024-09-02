import PropTypes from "prop-types";

const Heading = ({ text, align }) => {
  return (
    <h2
      className={`lg:text-5xl md:text-4xl text-2xl font-semibold text-${
        align ? align : "start"
      }`}
    >
      {text}
    </h2>
  );
};

Heading.propTypes = {
  text: PropTypes.string,
  align: PropTypes.string,
};

export default Heading;
