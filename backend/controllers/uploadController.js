exports.uploadImage = (req, res) => {
  res.json({
    success: true,
    image: req.file.filename,
    path: `/uploads/${req.file.filename}`,
  });
};