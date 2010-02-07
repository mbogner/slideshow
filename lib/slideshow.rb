module Slideshow

  def hash_key_to_js_array(hash, key)
    tmp = []
    hash.each do |item|
      tmp << "\"#{item[key].gsub(/["']/,'')}\""
    end
    'new Array(' + tmp.join(',') + ')'
  end

  def slide_show_includes(theme='default')
    javascript_include_tag('slideshow/slideshow') + "\n" +
      stylesheet_link_tag('slideshow/slideshow', "slideshow/themes/#{theme}") + "\n"
  end

  def slideshow(name, inittimeout, timeout, start_index, content = []) #content = {:title => text, :message => text, :image_path => path, :link_to => url}
    "
<div class='slideshow_container'>
  <div id='#{name}_background' class='slideshow_inner'>
    <div id='#{name}_text_container' class='slideshow_text_container'>
      <div id='#{name}_header' class='slideshow_text_header'></div>
      <div id='#{name}_text'class='slideshow_text'></div>
    </div>
    <div id='#{name}_slideshow_buttons' class='slideshow_buttons'>
      <a href='javascript:void(0);' onclick='slideshow_back(\"#{name}\");'><img src='/images/slideshow/back.png' alt='back' border='0' /></a>
      <a href='javascript:void(0);' onclick='slideshow_next(\"#{name}\");'><img src='/images/slideshow/next.png' alt='next' border='0' /></a>
    </div>
  </div>
</div>

<script type='text/javascript'>
  slideshow_init('ss1', #{inittimeout}, #{timeout}, #{start_index}, #{hash_key_to_js_array(content, :title)}, #{hash_key_to_js_array(content, :message)},
    #{hash_key_to_js_array(content, :image)}, #{hash_key_to_js_array(content, :link_to)} );
</script>"
  end
  
end