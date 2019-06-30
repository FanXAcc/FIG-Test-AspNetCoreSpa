using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using AspnetCoreSPATemplate.Models;

namespace AspnetCoreSPATemplate.Utilities
{
    public class CsvHandler
    {
        public static List<Customer> GetCustomers()
        {
            try
            {
                List<Customer> customers = new List<Customer>();
                using (var reader = new StreamReader(@"SampleData.csv"))
                {
                    // Ignor the column names
                    reader.ReadLine();

                    // Regex for handling comma inside double quotes
                    Regex r = new Regex(",(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))");

                    while (!reader.EndOfStream)
                    {
                        var line = reader.ReadLine().Split(';');
                        String[] values = r.Split(line[0]);

                        for (int i = 0; i < values.Length; i++)
                        {
                            values[i] = values[i].TrimStart(' ', '"');
                            values[i] = values[i].TrimEnd('"');
                        }

                        Customer customer = new Customer()
                        {
                            FirstName = values[0],
                            LastName = values[1],
                            //CompanyName = values[2],
                            //Address = values[3],
                            //City = values[4],
                            //State = values[5],
                            //Post = values[6],
                            Phone1 = values[7],
                            Email = values[9],
                            //Web = values[10]
                        };
                        customers.Add(customer);
                    }
                }

                return customers;
            }
            catch(Exception e)
            {
                // TODO: Log exception 
                return null;
            }
        }
    }
}
