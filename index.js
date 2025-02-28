"use strict";

var _express = _interopRequireWildcard(require("express"));

var _scraper = _interopRequireWildcard(require("@bochilteam/scraper"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const app = (0, _express.default)();
app.use((0, _express.json)());
const PORT = process.env.PORT || 3000;
app.get('/abc', async (req, res) => {
  const url = req.query.url;
  console.log(url);
  (0, _scraper.savefrom)(url).then(data => {
    res.json(transform(data));
  }).catch(err => {
    res.json("not found");
  });
});
app.listen(PORT, () => console.log(`App listening at ppport ${PORT}`));

function transform(data) {
  return {
    img: data.thumb,
    urls: data.url.map(u => ({
      url: u.url,
      quality: u.quality,
      ext: u.ext,
      size: u.filesize
    }))
  };
}
