﻿using System;
using System.Collections.Generic;
using System.Configuration;
using Npgsql;

namespace MyRESTService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "ProductRESTService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select ProductRESTService.svc or ProductRESTService.svc.cs at the Solution Explorer and start debugging.
    public class ProductRESTService : IProductRESTService
    {

        private NpgsqlConnection conn;

        public ProductRESTService() {
            conn = new NpgsqlConnection(ConfigurationManager.ConnectionStrings["MyConnection"].ConnectionString);
        }

        public bool connect() {
            try {
                conn.Open();
                return true;
            } catch (Exception ee) {
                return false;
            }
        }

        public bool disconnect() {
            try{
                conn.Close();
                return true;
            }catch (Exception ee){
                return false;
            }
        }


        public List<Product> GetProductList()
        {
            return Products.Instance.ProductList;
        }




        public string GetAll()
        {
            string msg = "";
            string query = "SELECT add_customer(201505054,'Ricardo','Flores','Obando','88855692','ricardo@gmail.com','richard','123');";
            //DateTime bdate = Convert.ToDateTime(str.BDate);
            List<Object> lstSelect = new List<Object>();
            try
            {
                this.connect();
                NpgsqlCommand command = new NpgsqlCommand(query, conn);
                NpgsqlDataReader dr = command.ExecuteReader();
                while (dr.Read())
                {
                    for (int i = 0; i < dr.FieldCount; i++)
                    {
                        msg += dr[i];
                        //lstSelect.Add(dr[i]);
                    }
                    Console.WriteLine();
                }
                this.disconnect();
            }
            catch (Exception ee)
            {
                msg += ee;
                //lstSelect.Add("Error" + ee);
            }
            return msg;
        }



        public string PostCustomer(Customer str){
            string query = "SELECT add_customer(@ID_Customer,@Name,@Lastname_1,@Lastname_2, @Phone,@Email,@Username,@Password)";
            string msg="";
            try {
                this.connect();
                NpgsqlCommand sqlcmd = new NpgsqlCommand(query, conn);
                sqlcmd.Parameters.AddWithValue("@ID_Customer", str.ID_Customer);
                sqlcmd.Parameters.AddWithValue("@Name", str.Name);
                sqlcmd.Parameters.AddWithValue("@Lastname_1", str.Lastname_1);
                sqlcmd.Parameters.AddWithValue("@Lastname_2", str.Lastname_2);
                sqlcmd.Parameters.AddWithValue("@Phone", str.Phone);
                sqlcmd.Parameters.AddWithValue("@Email", str.Email);
                sqlcmd.Parameters.AddWithValue("@Username", str.Username);
                sqlcmd.Parameters.AddWithValue("@Password", str.Password);
                sqlcmd.ExecuteNonQuery();
                msg = "Ok";
            }catch (Exception ex) {
                msg += " Insert Error:";
                msg += ex.Message;
            }finally{
                this.disconnect();
            }
            return msg;
        }

        public string UpdateCustomer(Customer str)
        {
            string query = "SELECT update_customer(@ID_Customer,@Name,@Lastname_1,@Lastname_2, @Phone,@Email,@Username,@Password)";
            string msg = "";
            try{
                this.connect();
                NpgsqlCommand sqlcmd = new NpgsqlCommand(query, conn);
                sqlcmd.Parameters.AddWithValue("@ID_Customer", str.ID_Customer);
                sqlcmd.Parameters.AddWithValue("@Name", str.Name);
                sqlcmd.Parameters.AddWithValue("@Lastname_1", str.Lastname_1);
                sqlcmd.Parameters.AddWithValue("@Lastname_2", str.Lastname_2);
                sqlcmd.Parameters.AddWithValue("@Phone", str.Phone);
                sqlcmd.Parameters.AddWithValue("@Email", str.Email);
                sqlcmd.Parameters.AddWithValue("@Username", str.Username);
                sqlcmd.Parameters.AddWithValue("@Password", str.Password);
                sqlcmd.ExecuteNonQuery();
                msg = "Ok";
            }
            catch (Exception ex)
            {
                msg += " Insert Error:";
                msg += ex.Message;
            }
            finally
            {
                this.disconnect();
            }
            return msg;
        }

        public string PostEngineer(Engineer str)
        {
            string query = "SELECT add_engineer(@ID_Engineer,@Name,@Lastname_1,@Lastname_2, @Phone,@Email,@Eng_Code,@Username,@Password,@Role)";
            string msg = "";
            try
            {
                this.connect();
                NpgsqlCommand sqlcmd = new NpgsqlCommand(query, conn);
                sqlcmd.Parameters.AddWithValue("@ID_Engineer", str.ID_Engineer);
                sqlcmd.Parameters.AddWithValue("@Name", str.Name);
                sqlcmd.Parameters.AddWithValue("@Lastname_1", str.Lastname_1);
                sqlcmd.Parameters.AddWithValue("@Lastname_2", str.Lastname_2);
                sqlcmd.Parameters.AddWithValue("@Phone", str.Phone);
                sqlcmd.Parameters.AddWithValue("@Email", str.Email);
                sqlcmd.Parameters.AddWithValue("@Eng_Code", str.Eng_Code);
                sqlcmd.Parameters.AddWithValue("@Username", str.Username);
                sqlcmd.Parameters.AddWithValue("@Password", str.Password);
                sqlcmd.Parameters.AddWithValue("@Role", str.Role);
                sqlcmd.ExecuteNonQuery();
                msg = "Ok";
            }
            catch (Exception ex)
            {
                msg += " Insert Error:";
                msg += ex.Message;
            }
            finally
            {
                this.disconnect();
            }
            return msg;
        }

        public string UpdateEngineer(Engineer str){
            string query = "SELECT update_engineer(@ID_Engineer,@Name,@Lastname_1,@Lastname_2, @Phone,@Email,@Eng_Code,@Username,@Password)";
            string msg = "";
            try{
                this.connect();
                NpgsqlCommand sqlcmd = new NpgsqlCommand(query, conn);
                sqlcmd.Parameters.AddWithValue("@ID_Engineer", str.ID_Engineer);
                sqlcmd.Parameters.AddWithValue("@Name", str.Name);
                sqlcmd.Parameters.AddWithValue("@Lastname_1", str.Lastname_1);
                sqlcmd.Parameters.AddWithValue("@Lastname_2", str.Lastname_2);
                sqlcmd.Parameters.AddWithValue("@Phone", str.Phone);
                sqlcmd.Parameters.AddWithValue("@Email", str.Email);
                sqlcmd.Parameters.AddWithValue("@Eng_Code", str.Eng_Code);
                sqlcmd.Parameters.AddWithValue("@Username", str.Username);
                sqlcmd.Parameters.AddWithValue("@Password", str.Password);
                sqlcmd.ExecuteNonQuery();
                msg = "Ok";
            }catch (Exception ex){
                msg += " Insert Error:";
                msg += ex.Message;
            }finally{
                this.disconnect();
            }
            return msg;
        }

        public string PostProject(Project str)
        {
            string query = "SELECT add_project(@Name,@Location,@ID_Engineer, @ID_Customer,@Comments,@Details)";
            string msg = "";
            try
            {
                this.connect();
                NpgsqlCommand sqlcmd = new NpgsqlCommand(query, conn);
                sqlcmd.Parameters.AddWithValue("@Name", str.Name);
                sqlcmd.Parameters.AddWithValue("@Location", str.Location);
                sqlcmd.Parameters.AddWithValue("@ID_Engineer", str.ID_Engineer);
                sqlcmd.Parameters.AddWithValue("@ID_Customer", str.ID_Customer);
                sqlcmd.Parameters.AddWithValue("@Comments", str.Comments);
                sqlcmd.Parameters.AddWithValue("@Details", str.Details);
                sqlcmd.ExecuteNonQuery();
                msg = "Ok";
            }
            catch (Exception ex)
            {
                msg += " Insert Error:";
                msg += ex.Message;
            }
            finally
            {
                this.disconnect();
            }
            return msg;
        }

        public string PostProjectComment(Project str)
        {
            string query = "SELECT add_comment_to_project(@ID_Project,@Comments)";
            string msg = "";
            try{
                this.connect();
                NpgsqlCommand sqlcmd = new NpgsqlCommand(query, conn);
                sqlcmd.Parameters.AddWithValue("@ID_Project", str.ID_Project);
                sqlcmd.Parameters.AddWithValue("@Comments", str.Comments);
                sqlcmd.ExecuteNonQuery();
                msg = "Ok";
            }
            catch (Exception ex)
            {
                msg += " Insert Error:";
                msg += ex.Message;
            }
            finally
            {
                this.disconnect();
            }
            return msg;
        }

        public string PostProjectCommentDel(Project str)
        {
            string query = "SELECT delete_comment_from_project(@ID_Project)";
            string msg = "";
            try
            {
                this.connect();
                NpgsqlCommand sqlcmd = new NpgsqlCommand(query, conn);
                sqlcmd.Parameters.AddWithValue("@ID_Project", str.ID_Project);
                sqlcmd.ExecuteNonQuery();
                msg = "Ok";
            }
            catch (Exception ex)
            {
                msg += " Insert Error:";
                msg += ex.Message;
            }
            finally
            {
                this.disconnect();
            }
            return msg;
        }





























    }
}