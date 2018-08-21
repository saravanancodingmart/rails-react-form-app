class FormsController < ApplicationController
	skip_before_action :verify_authenticity_token
	def index
		begin
			data = Form.all
			status = true
		rescue
			status = false
		end
		render :json => {status: status,data: data}
	end

	def create
	  begin
	  	data= Form.create( :email => params["item"]["email"],:password => params["item"]["password"],:name => params["item"]["name"],:age => params["item"]["age"],:gender => params["item"]["gender"],:role => params["item"]["role"], :profile_picture => params["item"]["profile_picture"],:city => params["item"]["city"] )
	  	status = true
	  rescue
	  	status = false
	  end
	  render :json => {status: status,data: data}
	end

	def update
    begin
			@data =  Form.find(params[:id])
			@data.update( :email => params["item"]["email"],:password => params["item"]["password"],:name => params["item"]["name"],:age => params["item"]["age"],:gender => params["item"]["gender"],:role => params["item"]["role"], :profile_picture => params["item"]["profile_picture"],:city => params["item"]["city"] )
			@data.save
			status = true
		rescue
			status = false
		end
		render :json => {status: status,data: @data}
  end

	def destroy
		begin
			data =  Form.destroy(params[:id])
			status = true
		rescue
			status = false
		end
		render :json => {status: status,data: data}
	end

end
