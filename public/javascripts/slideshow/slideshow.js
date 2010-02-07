var slideshow_position = new Array();
var slideshow_item_counts = new Array();
var slideshow_images = new Array();
var slideshow_titles = new Array();
var slideshow_messages = new Array();
var slideshow_links = new Array();
var slideshow_timeouts = new Array();
var slideshow_intervals = new Array();
var slideshow_timeouts_aktiv = new Array();

function preload(path) {
    tmp = new Image();
    tmp.src = path;
}

function start_slideshow(name) {
    clearTimeout(slideshow_timeouts_aktiv[name]);
    $(name+'_slideshow_buttons').style.visibility = 'visible';
    slideshow_next(name);
}

function restart_slideshow(name) {
    clearInterval(slideshow_intervals[name]);
    slideshow_intervals[name] = setInterval('slideshow_next("' + name + '")', slideshow_timeouts[name]*1000);
}

function slideshow_init(name, inittimeout, timeout, start_index, titles, messages, images, links) {
    slideshow_position[name] = start_index;
    slideshow_item_counts[name] = titles.length;
    slideshow_images[name] = images;
    slideshow_titles[name] = titles;
    slideshow_messages[name] = messages;
    slideshow_timeouts[name] = timeout
    slideshow_links[name] = links;
    slideshow_timeouts_aktiv[name] = setTimeout('start_slideshow("' + name + '")', inittimeout*1000);

    // preload first image
    path = "/images/slideshow/shows/" + name + "/" + slideshow_images[name][start_index+1];
    preload(path);
}

function slideshow_update_image(name) {
    $(name+'_background').style.backgroundPosition = 'right top';
    newImage = "url('" + "/images/slideshow/shows/" + name + "/" + slideshow_images[name][slideshow_position[name]] + "')";
    $(name+'_background').style.backgroundImage = newImage;

    // preload next image
    path = "/images/slideshow/shows/" + name + "/" + slideshow_images[name][((slideshow_position[name]+1)%slideshow_item_counts[name])];
    preload(path);
}

function slideshow_update_text(name) {
    $(name+'_text_container').style.visibility = 'visible';
    $(name+'_header').innerHTML = '<a href="'+slideshow_links[name][slideshow_position[name]]+'">'+slideshow_titles[name][slideshow_position[name]]+'</a>';
    $(name+'_text').innerHTML = slideshow_messages[name][slideshow_position[name]];
}

function slideshow_next(name) {
    slideshow_position[name] = ++slideshow_position[name]%slideshow_item_counts[name];
    slideshow_update_image(name);
    slideshow_update_text(name);
    restart_slideshow(name);
}

function slideshow_back(name) {
    slideshow_position[name] = Math.abs(--slideshow_position[name]%slideshow_item_counts[name]);
    slideshow_update_image(name);
    slideshow_update_text(name);
    restart_slideshow(name);
}

