import web
urls = (
  '/api/', 'index'
  )
app = web.application(urls, globals())
print 'xukaijie'
application = app.wsgifunc()
class index:
  def GET(self):
      return "Hello, world!"
if __name__ == "__main__":
  app.run()
