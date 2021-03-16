export function fileToBase64(file = {}, callback = () => { }) {
  const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onload = function () {
    return callback(reader.result.split(',')[1]);
  };
};