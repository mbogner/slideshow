require_dependency 'slideshow'

ActionView::Base.send(:include, Slideshow)


unless File.exists?(RAILS_ROOT + '/public/javascripts/slideshow/slideshow.js')
  ['/public', '/public/javascripts/slideshow', '/public/stylesheets/slideshow', '/public/stylesheets/slideshow/themes', '/public/images/slideshow'].each do |dir|
    source = File.dirname(__FILE__) + "/#{dir}"
    dest = RAILS_ROOT + dir
    FileUtils.mkdir_p(dest)
    FileUtils.cp(Dir.glob(source+'/*.*'), dest)
  end
end