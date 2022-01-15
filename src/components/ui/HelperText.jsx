export const HelperText = ({ msg }) => {
  if (!msg) return null;

  return (
    <div className="ui__helperText-error d-flex align-items-center my-2 ">
      <i className="fa fa-exclamation-circle ui__span-icon me-2" />
      <span className='fw-bold'>{msg}</span>
    </div>
  );
};
