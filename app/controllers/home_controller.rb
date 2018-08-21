class HomeController < ApplicationController
  def index

  end
  def create
	  begin
	  	binding.pry
	  	JSON.parse(params[:data]).each do |form|
	  		Form.create( :email => form["email"],:password => form["password"],:name => form["name"],:age => form["age"],:gender => form["gender"],:profile_picture => form["profile_picture"],:city => form["city"] )
	  	end
	  	status = true
	  rescue
	  	status = false
	  end
	  render :json => {status: status,form: JSON.parse(params[:data])}
	end
end
